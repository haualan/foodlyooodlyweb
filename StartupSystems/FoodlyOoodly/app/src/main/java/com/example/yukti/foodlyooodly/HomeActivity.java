package com.example.yukti.foodlyooodly;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

/**
 * Created by Yukti on 12/8/14.
 */
public class HomeActivity extends Activity{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        Button viewMeal = (Button) findViewById(R.id.viewMealsButton);
        Button addMeal = (Button) findViewById(R.id.newMealButton);

        View.OnClickListener listener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //redirect to view meals
                startActivity(new Intent(HomeActivity.this, WebActivity.class));
            }
        };
        viewMeal.setOnClickListener(listener);

        listener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //redirect to new meal
                startActivity(new Intent(HomeActivity.this, NewMealsActivity.class));
            }
        };
        addMeal.setOnClickListener(listener);
    }

}
