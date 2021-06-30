import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("name", () => {
    expect(2+2).toEqual(4)
  })

  describe("getAll", () => {
    it("should return an array", () => {
      let result = service.getAll()
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe("getOne", () => {
    
    it("should return an movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000
      })
      
      const movie = service.getOne(1)
      expect(movie).toBeDefined()
      expect(movie.id).toEqual(1)
    })

    it("should throw 404 error", () => {
      try {
        service.getOne(999)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toEqual(`Movie with ID: 999 not found`)
      }
    })
  })

  describe("deleteOne",() => {
    it("deletes a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000
      })
      
      let allMovies = service.getAll()
      service.deleteOne(1)
      let after = service.getAll()
      expect(after.length).toEqual(allMovies.length - 1)
    })
    it("should throw 404 error", () => {
      try {
        service.deleteOne(999)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe("create", () => {
    
    it("should create a movie", () => {
      let before = service.getAll().length
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000
      })
      
      let after = service.getAll().length
      expect(after).toEqual(before + 1)
    })
  })

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000
      })

      service.update(1, { title: 'updated test' })
      let movie = service.getOne(1)
      expect(movie.title).toEqual('updated test')
    })

    it("should throw 404 error", () => {
      try {
        service.update(999, {})
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })
});
