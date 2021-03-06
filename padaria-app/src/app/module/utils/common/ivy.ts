import { Type, ɵNG_PIPE_DEF, ɵPipeDef } from '@angular/core';

const NG_PIPE_DEF = ɵNG_PIPE_DEF as 'ɵpipe';

export interface PipeType<T> extends Type<T> {
  ɵpipe: ɵPipeDef<T>;
}

export function isPipe<T>(target: any): target is PipeType<T> {
  return !!target[NG_PIPE_DEF];
}
