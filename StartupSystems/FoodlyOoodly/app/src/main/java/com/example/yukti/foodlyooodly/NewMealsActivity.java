package com.example.yukti.foodlyooodly;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Created by Yukti on 12/8/14.
 */
public class NewMealsActivity extends Activity {

    private ImageView mImageView;
    String TAG = getClass().getName();
    private EditText titleText;
    private EditText contentText;

    // Activity request codes
    private static final int CAMERA_CAPTURE_IMAGE_REQUEST_CODE = 100;
    public static final int MEDIA_TYPE_IMAGE = 1;
    // directory name to store captured images and videos
    private static final String IMAGE_DIRECTORY_NAME = "FoodlyOoodly";
    private Uri fileUri; // file url to store image/video


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_newmeal);

        Button takePicButton = (Button) findViewById(R.id.picButton);
        Button saveButton = (Button) findViewById(R.id.saveButton);
        mImageView = (ImageView) findViewById(R.id.imageView);

        titleText = (EditText) findViewById(R.id.titleText);
        contentText = (EditText) findViewById(R.id.contentText);

        View.OnClickListener listener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //take a pic
                captureImage();
            }
        };
        takePicButton.setOnClickListener(listener);

        listener = new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //check if theres data and save it somewhere
                onSaveButton();
                //go back to prev page
                finish();
            }
        };
        saveButton.setOnClickListener(listener);

    }

    //save data
    private void onSaveButton(){
        System.out.println(fileUri);
//        if(titleText.getText().toString().isEmpty() || contentText.getText().toString().isEmpty()){
//            Toast.makeText(getApplicationContext(),
//                    "Need to have BOTH Title and Content", Toast.LENGTH_LONG)
//                    .show();
//            return;
//        }
        //save to text file

        //save to external drive if available
        String state = Environment.getExternalStorageState();
        if (!Environment.MEDIA_MOUNTED.equals(state)) {
            System.out.println("No external");
            return;
            //not able to write
        }
        // Get the directory for the user's public doc directory.
        System.out.printf("env path is %s.\n", Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS));
        File myDir = new File(Environment.getExternalStoragePublicDirectory(
                Environment.DIRECTORY_DOWNLOADS), IMAGE_DIRECTORY_NAME);
        if (!myDir.mkdirs() || !myDir.isDirectory()) {
            System.out.println("Directory not created");
            myDir.mkdirs();
        }
        String timeStamp = fileUri.getPath().split("IMG_")[1];
        String filename = "IMG_" +timeStamp + ".txt";
        File file = new File(myDir,filename);
        FileOutputStream outputStream;

        try {
            outputStream = new FileOutputStream(file);
            String output = titleText.getText().toString() + "\n" + contentText.getText().toString();
            outputStream.write(output.getBytes());
            outputStream.close();
            System.out.printf("Printed trace to external memory %s.\n", filename);
        } catch (Exception e) {
            System.out.printf("Could not print trace to external memory %s!.\n", filename);
            e.printStackTrace();
        }
    }


    //get image
    private void captureImage() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

        fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE);

        intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);

        // start the image capture Intent
        startActivityForResult(intent, CAMERA_CAPTURE_IMAGE_REQUEST_CODE);
    }

    //store file loc
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);

        // save file url in bundle as it will be null on screen orientation
        // changes
        outState.putParcelable("file_uri", fileUri);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);

        // get the file url
        fileUri = savedInstanceState.getParcelable("file_uri");
    }

    //getting image from cam
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        // if the result is capturing Image
        if (requestCode == CAMERA_CAPTURE_IMAGE_REQUEST_CODE) {
            if (resultCode == RESULT_OK) {
                // successfully captured the image
                // display it in image view
                previewCapturedImage();
            } else if (resultCode == RESULT_CANCELED) {
                // user cancelled Image capture
                Toast.makeText(getApplicationContext(),
                        "User cancelled image capture", Toast.LENGTH_SHORT)
                        .show();
            } else {
                // failed to capture image
                Toast.makeText(getApplicationContext(),
                        "Sorry! Failed to capture image", Toast.LENGTH_SHORT)
                        .show();
            }
        }
    }

    //show image
    private void previewCapturedImage() {
        try {

            mImageView.setVisibility(View.VISIBLE);

            // bimatp factory
            BitmapFactory.Options options = new BitmapFactory.Options();

            // downsizing image as it throws OutOfMemory Exception for larger
            // images
            options.inSampleSize = 8;

            final Bitmap bitmap = BitmapFactory.decodeFile(fileUri.getPath(),
                    options);

            mImageView.setImageBitmap(bitmap);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
    }

    //create image path
    public Uri getOutputMediaFileUri(int type) {
        return Uri.fromFile(getOutputMediaFile(type));
    }

    //get image file
    private static File getOutputMediaFile(int type) {

        // External sdcard location
        File mediaStorageDir = new File(
                Environment
                        .getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS),
                IMAGE_DIRECTORY_NAME);

        // Create the storage directory if it does not exist
        if (!mediaStorageDir.exists()) {
            if (!mediaStorageDir.mkdirs()) {
                Log.d(IMAGE_DIRECTORY_NAME, "Oops! Failed create "
                        + IMAGE_DIRECTORY_NAME + " directory");
                return null;
            }
        }

        // Create a media file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss",
                Locale.getDefault()).format(new Date());
        File mediaFile;
        if (type == MEDIA_TYPE_IMAGE) {
            mediaFile = new File(mediaStorageDir.getPath() + File.separator
                    + "IMG_" + timeStamp + ".jpg");
        } else {
            return null;
        }

        return mediaFile;
    }

}
