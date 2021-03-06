import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = []

    getAll(): Movie[] {
        return this.movies
    }

    getOne(id: number): Movie {
        console.log(id)
        console.log(this.getAll())
        const movie = this.movies.find((item) => {
            return item.id === id
        })
        if (!movie) {
            throw new NotFoundException(`Movie with ID: ${id} not found`)
        }

        return movie
    }

    deleteOne(id: number) {
        this.getOne(id)
        this.movies = this.movies.filter((movie) => {
            movie.id !== +id
        })
    }

    create(movie: CreateMovieDTO) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movie
        })
        console.log(this.movies)
    }

    update(id: number, movie: UpdateMovieDTO) {
        let item = this.getOne(id)
        this.deleteOne(id)
        this.movies.push({
            ...item,
            ...movie
        })
    }
}
