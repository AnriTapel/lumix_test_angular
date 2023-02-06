import { InjectionToken } from "@angular/core";
import { LimitConfig } from "./models/toke.model";

export const FETCH_LIMIT_TOKEN = new InjectionToken<LimitConfig>('config');