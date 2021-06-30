import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll()
    }

    @Get("/search")
    search(@Query("year") year: string) {
        return `search ${year}`
    }

    @Get("/:id")
    getOne(@Param("id") id: number): Movie {
        return this.moviesService.getOne(id)
    }

    @Post()
    create(@Body() movie: CreateMovieDTO) {
        return this.moviesService.create(movie)
    }

    @Delete("/:id")
    remove(@Param("id") id: number) {
        return this.moviesService.deleteOne(id)
    }   

    @Put("/:id")
    patch(@Param("id") id: number, @Body() movie: UpdateMovieDTO) {
        return this.moviesService.update(id, movie)
    }
}
