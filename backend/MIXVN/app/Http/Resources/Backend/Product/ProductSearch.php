<?php

namespace App\Http\Resources\Backend\Product;

use Illuminate\Http\Resources\Json\Resource;

class ProductSearch extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'img' => $this->img ? asset($this->img) : ''
        ];
    }
}