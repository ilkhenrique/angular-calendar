import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterModule } from '@angular/router';
import { map, take, filter } from 'rxjs/operators';
import StackBlitzSDK from '@stackblitz/sdk';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2';
import { sources as demoUtilsSources } from './demo-modules/demo-utils/sources';
import { Subject } from 'rxjs';
import { NgbNav, NgbNavModule, NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { ClipboardModule } from 'ngx-clipboard';
import { CarbonAdComponent } from './carbon-ad/carbon-ad.component';

interface Source {
  filename: string;
  contents: {
    raw: string;
    highlighted: string;
  };
  language: string;
}

interface Demo {
  label: string;
  path: string;
  sources?: Source[];
  darkTheme: boolean;
  tags: string[];
}

function getSources(folder: string): Promise<Source[]> {
  return import('./demo-modules/' + folder + '/sources.ts').then(
    ({ sources }) => {
      return sources.map(({ filename, contents }) => {
        const [, extension]: RegExpMatchArray = filename.match(/^.+\.(.+)$/);
        const languages: { [extension: string]: string } = {
          ts: 'typescript',
          html: 'html',
          css: 'css',
        };
        return {
          filename,
          contents: {
            raw: contents.raw.default
              .replace(
                ",\n    RouterModule.forChild([{ path: '', component: DemoComponent }])",
                ''
              )
              .replace("\nimport { RouterModule } from '@angular/router';", ''),
            highlighted: contents.highlighted.default // TODO - move this into a regexp replace for both
              .replace(
                ',\n    RouterModule.forChild([{ path: <span class="hljs-string">\'\'</span>, component: DemoComponent }])',
                ''
              )
              .replace(
                '\n<span class="hljs-keyword">import</span> { RouterModule } from <span class="hljs-string">\'@angular/router\'</span>;',
                ''
              ),
          },
          language: languages[extension],
        };
      });
    }
  );
}

// Hardcoded dependency versions to avoid dynamic requires
const dependencyVersions: any = {
  angular: '19.2.14',
  angularRouter: '19.2.14',
  angularCalendar: '0.31.1',
  calendarUtils: '0.11.0',
  angularResizableElement: '7.0.2',
  angularDraggableDroppable: '8.0.0',
  dateFns: '4.1.0',
  rxjs: '7.8.2',
  bootstrap: '5.3.6',
  zoneJs: '0.15.0',
  ngBootstrap: '18.0.0',
  rrule: '2.8.1',
  fontAwesome: '6.7.2',
  positioning: '2.0.1',
  flatpickr: '4.6.13',
  angularxFlatpickr: '8.1.0',
};

@Component({
  selector: 'mwl-demo-app',
  styleUrls: ['./demo-app.css'],
  templateUrl: './demo-app.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbNavModule,
    NgbCollapseModule,
    NgbTooltipModule,
    DragAndDropModule,
    ClipboardModule,
    RouterModule,
    CarbonAdComponent
  ]
})
export class DemoAppComponent implements OnInit {
  @ViewChild('nav', { static: false }) nav: NgbNav;
  demos: Demo[] = [];
  filteredDemos: Demo[] = [];
  activeDemo: Demo;
  isMenuVisible = false;
  firstDemoLoaded = false;
  searchText = '';
  copied$ = new Subject<boolean>();

  constructor(
    private router: Router,
    analytics: Angulartics2GoogleGlobalSiteTag
  ) {
    analytics.startTracking();
  }

  ngOnInit() {
    const defaultRoute = this.router.config.find(
      (route) => route.path === '**'
    );

    this.demos = this.router.config
      .filter((route) => route.path !== '**')
      .map((route) => ({
        path: route.path,
        label: route.data.label,
        darkTheme: route.data.darkTheme,
        tags: route.data.tags || [],
      }));
    this.updateFilteredDemos();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(take(1))
      .subscribe(() => {
        this.firstDemoLoaded = true;
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .pipe(
        map((event: NavigationStart) => {
          if (event.url === '/') {
            return { url: `/${defaultRoute.redirectTo}` };
          }
          return event;
        })
      )
      .subscribe((event: NavigationStart) => {
        this.activeDemo = this.demos.find(
          (demo) => `/${demo.path}` === event.url
        );
        getSources(this.activeDemo.path).then((sources) => {
          this.activeDemo.sources = sources;
        });
      });

    // Load external script with error handling
    try {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-uid', '7c1627e655');
      script.src = 'https://angular-calendar.ck.page/7c1627e655/index.js';
      
      // Add error handling for script loading
      script.onerror = (error) => {
        console.warn('Failed to load external script:', error);
      };
      
      document.getElementsByTagName('head')[0].appendChild(script);
    } catch (error) {
      console.warn('Error setting up external script:', error);
    }
  }

  updateFilteredDemos() {
    this.filteredDemos = this.demos.filter(
      (demo) =>
        !this.searchText ||
        [demo.label.toLowerCase(), ...demo.tags].some((tag) =>
          tag.includes(this.searchText.toLowerCase())
        )
    );
  }

  editInStackblitz(demo: Demo): void {
    const files: {
      [path: string]: string;
    } = {
      'index.html': `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@${dependencyVersions.bootstrap}/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://unpkg.com/@fortawesome/fontawesome-free@${dependencyVersions.fontAwesome}/css/all.css" rel="stylesheet">
<link href="https://unpkg.com/angular-calendar@${dependencyVersions.angularCalendar}/css/angular-calendar.css" rel="stylesheet">
<link href="https://unpkg.com/flatpickr@${dependencyVersions.flatpickr}/dist/flatpickr.css" rel="stylesheet">
<mwl-demo-component>Loading...</mwl-demo-component>
`.trim(),
      'main.ts': `
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DemoModule } from './demo/module';
import { DemoComponent } from './demo/component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoModule
  ],
  bootstrap: [DemoComponent]
})
export class BootstrapModule {}

platformBrowserDynamic().bootstrapModule(BootstrapModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
`.trim(),
    };

    demoUtilsSources.forEach((source) => {
      files[`demo-utils/${source.filename}`] = source.contents.raw.default;
    });

    demo.sources.forEach((source) => {
      files[`demo/${source.filename}`] = source.contents.raw;
    });

    try {
      // StackBlitzSDK.openProject returns void in this version, so we can't use .catch()
      // The try/catch block is sufficient for error handling
      StackBlitzSDK.openProject(
        {
          title: 'Angular Calendar Demo',
          description: demo.label,
          template: 'angular-cli',
          tags: ['angular-calendar'],
          files,
          dependencies: {
            '@angular/core': dependencyVersions.angular,
            '@angular/common': dependencyVersions.angular,
            '@angular/compiler': dependencyVersions.angular,
            '@angular/platform-browser': dependencyVersions.angular,
            '@angular/platform-browser-dynamic': dependencyVersions.angular,
            '@angular/router': dependencyVersions.angular,
            '@angular/forms': dependencyVersions.angular,
            '@angular/animations': dependencyVersions.angular,
            rxjs: dependencyVersions.rxjs,
            'zone.js': dependencyVersions.zoneJs,
            'angular-draggable-droppable': `^${dependencyVersions.angularDraggableDroppable}`,
            'angular-resizable-element': `^${dependencyVersions.angularResizableElement}`,
            'date-fns': dependencyVersions.dateFns,
            'angular-calendar': dependencyVersions.angularCalendar,
            '@ng-bootstrap/ng-bootstrap': '18.0.0', // updated for Angular 19
            rrule: dependencyVersions.rrule,
            'calendar-utils': dependencyVersions.calendarUtils,
            flatpickr: dependencyVersions.flatpickr,
            'angularx-flatpickr': dependencyVersions.angularxFlatpickr,
          },
        },
        {
          openFile: 'demo/component.ts',
        }
      );
      // Error handling is done by the try/catch block around this call above
    } catch (error) {
      console.warn('Error setting up StackBlitz project:', error);
    }
  }

  copied() {
    this.copied$.next(true);
    setTimeout(() => {
      this.copied$.next(false);
    }, 1000);
  }
}
