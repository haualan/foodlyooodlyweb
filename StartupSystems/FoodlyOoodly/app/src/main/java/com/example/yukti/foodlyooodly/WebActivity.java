package com.example.yukti.foodlyooodly;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

/**
 * Created by Yukti on 12/8/14.
 */
public class WebActivity extends Activity{

    private WebView myweb;

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web);

        myweb = (WebView) findViewById(R.id.webView);
        WebSettings webSettings = myweb.getSettings();
        webSettings.setJavaScriptEnabled(true);
        myweb.loadUrl("http://alanhau.me/#!/articles");

    }
}
