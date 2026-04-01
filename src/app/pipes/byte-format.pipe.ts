import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteFormat',
  standalone: true,
})
export class ByteFormatPipe implements PipeTransform {
  transform(bytes: number | null | undefined): string {
    if (bytes == null || bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
