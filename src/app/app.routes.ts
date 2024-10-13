import { Route } from '@angular/router';
import {PoliciesComponent} from '../../apps/my-app/src/app/policies/policies.component'

export const appRoutes: Route[] = [
    {
        path: '',
        component: PoliciesComponent,
        // children: [
        //   {
        //     path: '',
        //     component: PoliciesComponent
        //   }
        // ]
      },
];
