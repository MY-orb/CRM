import { observable } from 'mobx';
import { AnnotationsMap } from 'mobx/dist/internal';

export const CreateObservable = <T = any>(
  store: T,
  decorators: AnnotationsMap<T, never> = {},
) => {
  return observable.object<T>(store, decorators, { autoBind: true });
};
