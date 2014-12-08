package com.yukti.foodlyooodly;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.Toast;


public class Other_login extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_other_login);

        final ImageButton facebook = (ImageButton) findViewById(R.id.facebookButton);
        final ImageButton twitter = (ImageButton) findViewById(R.id.twitterButton);
        final ImageButton google = (ImageButton) findViewById(R.id.googleButton);
        final ImageButton github = (ImageButton) findViewById(R.id.githubButton);
        final ImageButton linkedin = (ImageButton) findViewById(R.id.linkedinButton);

        final Intent intent = new Intent(getApplicationContext(),Home.class);


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
                Toast.makeText(getApplicationContext(), "logged in with google", Toast.LENGTH_LONG).show();
                startActivity(intent);
            }
        };
        google.setOnClickListener(listener);


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


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_other_login, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
