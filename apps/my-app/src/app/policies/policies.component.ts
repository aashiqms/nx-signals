import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PoliciesService } from './services/policy.service';
import {
  patchState,
  signalState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { PolicyInterface } from './types/post.interface';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { DemoNgZorroAntdModule } from '../../../../../src/app/ng-zorro-ant.module';

export interface PoliciesStateInterface {
  policies: PolicyInterface[];
  isLoading: boolean;
  error: string | null;
}

export const PoliciesStore = signalStore(
  withState<PoliciesStateInterface>({
    policies: [],
    error: null,
    isLoading: false,
  }),
  withComputed((store) => ({
    policiesCount: computed(() => store.policies().length),
  })),
  withMethods((store, policiesService = inject(PoliciesService)) => ({
    addPolicy(title: string) {
      const newPolicy: PolicyInterface = {
        id: crypto.randomUUID(),
        title,
      };
      const updatedPolicies = [...store.policies(), newPolicy];
      patchState(store, { policies: updatedPolicies });
    },
    removePolicy(id: string) {
      const updatedPolicies = store.policies().filter((policy) => policy.id !== id);
      patchState(store, { policies: updatedPolicies });
    },
    addPolicies(policies: PolicyInterface[]) {
      patchState(store, { policies });
    },
    loadPolicies: rxMethod<void>(
      pipe(
        switchMap(() => {
          return policiesService.getPolicies().pipe(
            tap((policies) => {
              patchState(store, { policies });
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadPolicies();
    },
  })
);

@Component({
  selector: 'policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DemoNgZorroAntdModule],
  providers: [PoliciesStore],
})
export class PoliciesComponent {
  fb = inject(FormBuilder);
  postsService = inject(PoliciesService);
  store = inject(PoliciesStore);
  addForm = this.fb.nonNullable.group({
    title: '',
  });
  // state = signalState<PoliciesStateInterface>({
  //   posts: [],
  //   error: null,
  //   isLoading: false,
  // });

  // ngOnInit(): void {
  //   this.postsService.getPolicies().subscribe((posts) => {
  //     this.store.addPolicies(posts);
  //   });
  // }

  onAdd(): void {
    this.store.addPolicy(this.addForm.getRawValue().title);
    this.addForm.reset();
  }

  // removePost(id: string): void {
  //   const updatedPolicies = this.state.posts().filter((post) => post.id !== id);
  //   patchState(this.state, (state) => ({ ...state, posts: updatedPolicies }));
  // }
}
