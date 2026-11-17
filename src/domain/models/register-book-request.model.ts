import { IsString, IsInt, Min, Max } from 'class-validator';

export class RegisterBookRequest {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publicationYear: number;

  constructor(title: string, author: string, publicationYear: number) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;

    if (publicationYear < 1000 || publicationYear > new Date().getFullYear()) {
      throw new Error('Publication year must be between 1000 and current year');
    }
  }

  validate(): void {
    const errors: string[] = [];

    if (!this.title || this.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!this.author || this.author.trim().length === 0) {
      errors.push('Author is required');
    }

    if (this.publicationYear < 1000 || this.publicationYear > new Date().getFullYear()) {
      errors.push('Publication year must be between 1000 and current year');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  toBook(id: string): { id: string; title: string; author: string; publicationYear: number } {
    return {
      id,
      title: this.title,
      author: this.author,
      publicationYear: this.publicationYear,
    };
  }
}