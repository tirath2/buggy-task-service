/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseUrls } from './constants';
import { ERROR_MSG } from './error-msg';

@Injectable()
export class RequestService {
  async saveLogs(data) {
    try {
      const res = await axios.post(baseUrls.LOG_SERVICE + '/api-logs', data, {
        headers: {
          Authorization: (global as any).currentUserToken,
        },
      });
      return res;
    } catch (error) {
      throw new HttpException(
        ERROR_MSG.SOMETHING_WENT_WRONG,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
