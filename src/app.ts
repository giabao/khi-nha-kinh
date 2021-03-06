import {RouterConfiguration, RouteConfig} from 'aurelia-router';

export class App {
  private router: RouteConfig;

  configureRouter(config: RouterConfiguration, router: RouteConfig) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'mCO2giantiep', name: 'mCO2giantiep', moduleId: 'mCO2giantiep', nav: true, title:'mCO2giantiep' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
