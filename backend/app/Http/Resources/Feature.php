<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Feature extends Resource
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
            'order' => $this->order,
            'active' => $this->active,
            'feature_values' => FeatureValue::collection($this->featureValues->sortBy('order')->values())
        ];
    }
}
