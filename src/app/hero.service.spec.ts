import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


import { HeroService } from './hero.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
describe('HeroService', () => {
  let heroes: Hero[];
  let heroService: HeroService = null,
    mockBackend: MockBackend = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        HeroService,
      ]
    });
  });
  beforeEach(inject([HeroService, MockBackend], (service: HeroService, backend: MockBackend) => {
    heroService = service;
    mockBackend = backend;
  }));
  it('should ...', () => {
    expect(heroService).toBeTruthy();
  });
  it('should test getHeroes() api success Response', () => {
    let heroes: Hero[] = [
      new Hero(1,'Ram'),
      new Hero(2,'Sham'),
    ];
    let successResponse = { body: { data: heroes } };
    mockBackend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions(successResponse);
      connection.mockRespond(new Response(options));
    });
    heroService.getHeroes().subscribe(
      (response) => {
        expect(response['data']).toEqual(successResponse.body.data);
      }
    );
  });

  it('should test getHeros api - Error response',(done) => {
    let errorObj : ErrorMessage = {status : 404, statusText : 'Error in finding heroes'};
    mockBackend.connections.subscribe((connection: MockConnection) => {
      let body = {error : errorObj};
      let opts = { type: ResponseType.Error, status: 404, body: body };
      let responseOpts = new ResponseOptions(opts);
      connection.mockError(new MockError(responseOpts));
    });    
    heroService.getHeroes()
      .subscribe(
      response => { },
      err => {
        expect(err.status).toEqual(errorObj.status);
        expect(err.statusText).toEqual(errorObj.statusText);
        expect(err).toEqual(errorObj);
        done();
      });
  });
});
class ErrorMessage{
  public status : number;
  public statusText : string;
}
class MockError extends Response implements Error {
    name:any
    message:any
}