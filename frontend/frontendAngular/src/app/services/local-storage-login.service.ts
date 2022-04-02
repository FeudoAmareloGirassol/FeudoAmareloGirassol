import { Injectable } from '@angular/core';
import jwt_decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageLoginService {

  private storage: Storage;

  constructor() { 
    this.storage = window.localStorage;
  }

  set(key: string, value: any) {
    this.storage.setItem(key, value);
  }

  get(key: string): any {
    if (this.storage) {
      return this.storage.getItem(key);
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

  public decodePayloadJWT(): any {
    try {
      return jwt_decode(this.get("token"));
    } catch (Error) {
      return null;
    }
  }
  
}
