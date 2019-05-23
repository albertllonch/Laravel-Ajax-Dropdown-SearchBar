<?php


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class TestController extends Controller
{
  function search(){
    $query = $_POST['query'];
    $results = DB::where('name','like', $query.'%')->get();
    $json = array();
    foreach($results as $result){
      $json[$result->id]= array(
        'name'=> $result->name,
        'description'=> $result->description,
        'photo'=> $result->urlphoto
      );
    }
    return response()->json($json);
  }
}