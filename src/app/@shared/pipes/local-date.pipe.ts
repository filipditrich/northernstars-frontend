import { Pipe, PipeTransform } from '@angular/core';
import { getLang, translate } from '../helpers';
import * as moment from 'moment';

@Pipe({
  name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {

  transform(any: any, args?: any): any {
    return !!value ? moment(new Date(value)).locale(getLang()).format('lll') : translate('NOT_AVAILABLE');
  }

}
