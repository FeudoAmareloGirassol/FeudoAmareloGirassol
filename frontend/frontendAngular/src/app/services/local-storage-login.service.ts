import { Injectable } from '@angular/core';

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

  get logged(): boolean{
    return this.storage.getItem('token') ? true : false
  }
}
