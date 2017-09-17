<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\ProductGroup;
use App\Product;
use App\ProductGroupRelProduct;
use App\FeatureValueRelProduct;
use Carbon\Carbon;
use Storage;
use Intervention\Image\ImageManagerStatic as Image;

class ProductGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::transaction(function () use ($request) {
            $now = Carbon::now('UTC');
            $productGroup = new ProductGroup;
            $productGroup->active = ($request->active === 'true' || $request->active == 1) ? true : false;
            if ($request->img) {
                $productGroup->img = 'images/' . $now->format('Y-m-dTH-i-s-') . $request->img->getClientOriginalName();
                Image::make($request->img)->resize(500, null, function ($constraint) {
                    $constraint->aspectRatio();
                })->save($productGroup->img);
            }
            $productGroup->created_at = $now;
            $productGroup->updated_at = $now;

            $productGroup->save();

            $products = $request->products;
            if ($products) {
                foreach ($request->products as $product) {
                    $newProduct = new Product;
                    $newProduct->name = $product['name'];
                    $newProduct->price = $product['price'];
                    $newProduct->discount = $product['discount'];
                    $newProduct->category_id = $product['category'];
                    if ($product['img']) {
                        $newProduct->img = 'images/' . $now->format('Y-m-dTH-i-s-') . $product['img']->getClientOriginalName();
                        Image::make($product['img'])->resize(300, null, function ($constraint) {
                            $constraint->aspectRatio();
                        })->save($newProduct->img);
                        
                    }
                    $newProduct->active = ($product['active'] === 'true' || $product['active'] == 1) ? true : false;
                    $newProduct->supplier_id = $product['supplier'];
                    $newProduct->created_at = $now;                
                    $newProduct->updated_at = $now;
                    $success = $newProduct->save();
                    
                    if ($product['features']) {
                        $features = explode(',', $product['features']);
                        foreach ($features as $feature) {
                            $featureValueRelProduct = new FeatureValueRelProduct;
                            $featureValueRelProduct->feature_value_id = $feature;
                            $featureValueRelProduct->product_id = $newProduct->id;
                            $featureValueRelProduct->created_at = $now;
                            $featureValueRelProduct->updated_at = $now;
                            $featureValueRelProduct->save();
                        }
                    }

                    $productGroupRefProduct = new ProductGroupRelProduct;
                    $productGroupRefProduct->product_group_id = $productGroup->id;
                    $productGroupRefProduct->product_id = $newProduct->id;
                    $productGroupRefProduct->created_at = $now;
                    $productGroupRefProduct->updated_at = $now;
                    $productGroupRefProduct->save();
                }
            }

            $productIds = $request->productIds;
            if (count($productIds)) {
                foreach ($productIds as $productId) {
                    $productGroupRefProduct = new ProductGroupRelProduct;
                    $productGroupRefProduct->product_group_id = $productGroup->id;
                    $productGroupRefProduct->product_id = $productId;
                    $productGroupRefProduct->created_at = $now;
                    $productGroupRefProduct->updated_at = $now;
                    $productGroupRefProduct->save();
                }
            }
            
        }, 1);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}