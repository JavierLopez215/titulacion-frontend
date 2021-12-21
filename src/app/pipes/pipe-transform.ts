// Angular
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Sanitize HTML
 */
@Pipe({
  name: 'safe'
})
export class PipeFiles implements PipeTransform {
  
  constructor(protected _sanitizer: DomSanitizer) {
  }

  // transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    transform(value: string, type: string): any {
    // console.log('value',value);
    // this.domSanitizer.sanitize(SecurityContext.HTML,this.domSanitizer.bypassSecurityTrustHtml(this.parishDetail.mass_timings));
    switch (type) {
      case 'html':
        // console.log('html')
        return this._sanitizer.sanitize(SecurityContext.HTML,this._sanitizer.bypassSecurityTrustHtml(value));

        // return this._sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        // console.log('style')
        return this._sanitizer.sanitize(SecurityContext.STYLE,this._sanitizer.bypassSecurityTrustStyle(value));

        // return this._sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        // console.log('script')
        return this._sanitizer.sanitize(SecurityContext.SCRIPT,this._sanitizer.bypassSecurityTrustScript(value));

        // return this._sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        // console.log('url')
        return this._sanitizer.sanitize(SecurityContext.URL,this._sanitizer.bypassSecurityTrustUrl(value));

        // return this._sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        // console.log('resourceUrl')
        return this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,this._sanitizer.bypassSecurityTrustResourceUrl(value));
        // return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        // console.log('default')
        return this._sanitizer.sanitize(SecurityContext.HTML,this._sanitizer.bypassSecurityTrustHtml(value));

        // return this._sanitizer.bypassSecurityTrustHtml(value);
    }
  }
}