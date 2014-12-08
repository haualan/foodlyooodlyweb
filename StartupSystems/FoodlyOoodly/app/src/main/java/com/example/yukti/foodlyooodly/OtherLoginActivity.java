package com.example.yukti.foodlyooodly;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.Toast;

/**
 * Created by Yukti on 12/8/14.
 */
public class OtherLoginActivity extends Activity {

    public OtherLoginActivity(){}

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_other_login);

        final ImageButton facebook = (ImageButton) findViewById(R.id.facebookButton);
        final ImageButton twitter = (ImageButton) findViewById(R.id.twitterButton);
        final ImageButton github = (ImageButton) findViewById(R.id.githubButton);
        final ImageButton linkedin = (ImageButton) findViewById(R.id.linkedinButton);

        final Intent intent = new Intent(getApplicationContext(),HomeActivity.class);


        View.OnClickListener listener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //log in with fb
                Toast.makeText(getApplicationContext(), "logged in with facebook", Toast.LENGTH_LONG).show();
                startActivity(intent);
            }
        };
        facebook.setOnClickListener(listener);

        listener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //log in with fb
                Toast.makeText(getApplicationContext(), "logged in with github", Toast.LENGTH_LONG).show();
                startActivity(intent);
            }
        };
        github.setOnClickListener(listener);


        listener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //log in with fb
                Toast.makeText(getApplicationContext(), "logged in with linkedin", Toast.LENGTH_LONG).show();
                startActivity(intent);
            }
        };
        linkedin.setOnClickListener(listener);


        listener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //log in with fb
                Toast.makeText(getApplicationContext(), "logged in with twitter", Toast.LENGTH_LONG).show();
                startActivity(intent);
            }
        };
        twitter.setOnClickListener(listener);
    }

}
