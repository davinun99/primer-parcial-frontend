import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { PaisAgregarComponent } from './pais/pais-agregar/pais-agregar.component';
import { PaisComponent } from './pais/pais.component';
import { NgModule } from '@angular/core';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriasAgregarComponent } from './categorias/categorias-agregar/categorias-agregar.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { PacienteComponent } from './paciente/paciente.component'
import { ServiciosComponent } from './servicios/servicios.component';
export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    }, {
        path: 'components',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
    }, {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.Forms)
    }, {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    }, {
        path: 'maps',
        loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
    }, {
        path: 'widgets',
        loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
    }, {
        path: 'charts',
        loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
    }, {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    }, {
        path: '',
        loadChildren: () => import('./userpage/user.module').then(m => m.UserModule)
    }, {
        path: '',
        loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
    }
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }]
    },{
        path:'pais',
        component:PaisComponent
      },
      {
        path:'nuevopais',
        component:PaisAgregarComponent
      },{
        path:'categorias',
        component:CategoriasComponent
       },
       {
         path:'nuevacategorias',
         component:CategoriasAgregarComponent
       },
       {
         path: 'subcategoria',
         component: SubcategoriaComponent
       },
       {
         path: 'paciente',
         component: PacienteComponent
       },
       {
         path: 'servicios',
         component: ServiciosComponent
       }
      
       
];

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  