package com.cygnature;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.rnfs.RNFSPackage;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNNetworkInfoPackage(),
            new LinearGradientPackage(),
            new RNDeviceInfo(),
            new RNFetchBlobPackage(),
            new ReactNativeRestartPackage(),
            new RNSpinkitPackage(),
            new RNCWebViewPackage(),
            new PickerPackage(),
            new RNFSPackage(),
            new ReactNativeFingerprintScannerPackage(),
            new ReactNativeDocumentPicker(),
            new RNLocationPackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
