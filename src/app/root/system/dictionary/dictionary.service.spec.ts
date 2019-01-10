import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed, async, inject} from '@angular/core/testing';
import {getUrl} from '../../../@shared/config';
import {DictionaryService} from './dictionary.service';


describe('DictionaryServiceTest', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DictionaryService],
      imports: [
        HttpClientTestingModule,
      ],
    });
  });

  it('expects service to fetch data',
    inject([HttpTestingController, DictionaryService],
      (httpMock: HttpTestingController, service: DictionaryService) => {

      service.get().subscribe(response => {
        expect(response.response.success).toBeTruthy();
        expect(response.output.length).toBeGreaterThanOrEqual(0);
      });

      const req = httpMock.expectOne(getUrl('operator', 'GET_DICT'));
      expect(req.request.method).toEqual('GET');


      req.flush({
        response: {
          success: true,
          status: 200,
          name: 'RESOURCE_LOADED',
        },
        output: [
          {
            '_id': '5c2e2336d8ffa74cd7c4ecc0',
            'id': 'ADMIN',
            'cs': 'Administrátor',
            'en': 'Administrator',
            'createdAt': '2019-01-03T15:59:03+01:00',
            'updatedAt': '2019-01-06T22:05:24+01:00',
            '__v': 0,
            'createdBy': {
              '_id': '5c24428f32095600108a307e',
              'username': 'sysadmin',
              'email': 'filip.ditrich@gmx.us',
              'name': 'Filip Ditrich',
              'roles': [
                'player',
                'super',
                'admin',
              ],
            },
            'updatedBy': {
              '_id': '5c24428f32095600108a307e',
              'username': 'sysadmin',
              'email': 'filip.ditrich@gmx.us',
              'name': 'Filip Ditrich',
              'roles': [
                'player',
                'super',
                'admin',
              ],
            },
          },
        ],
      });

      }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

});
