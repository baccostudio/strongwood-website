export interface FacebookPixelConfig {
  enabled: boolean;
  pixelId: string;
  scriptLocale: string;
}

export interface GoogleTagManagerConfig {
  enabled: boolean;
  containerId: string;
  dataLayerName: string;
}

export interface SiteTrackingConfig {
  facebookPixel: FacebookPixelConfig;
  googleTagManager: GoogleTagManagerConfig;
}
