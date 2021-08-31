import { BandsService } from './services/bands.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';

let service: BandsService;
let httpClient: HttpClient;
let httpTestingController: HttpTestingController;

beforeEach(() => {
    TestBed.configureTestingModule({providers: [BandsService], imports: [HttpClientTestingModule]});
})

it('should use BandsService', () => {
    service = TestBed.inject(BandsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    expect(service.getBandsData()).toBe('data');
  });