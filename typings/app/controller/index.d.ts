// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAd from '../../../app/controller/ad';
import ExportApp from '../../../app/controller/app';
import ExportHome from '../../../app/controller/home';
import ExportLaunch from '../../../app/controller/launch';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    ad: ExportAd;
    app: ExportApp;
    home: ExportHome;
    launch: ExportLaunch;
    user: ExportUser;
  }
}
