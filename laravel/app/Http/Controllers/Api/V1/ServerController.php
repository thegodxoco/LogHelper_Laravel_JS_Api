<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;

class ServerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Server::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $request->validate([
            'ipv4' => 'required_without:ipv6|unique:servers|ipv4|nullable',
            'ipv6' => 'required_without:ipv4|unique:servers|ipv6|nullable',
            'location' => 'required|string',
            'description' => 'required|string',
        ]);
        $server = Server::create($request->all());
        return $server;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Server::findOrFail($id);
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
        $server = Server::findOrFail($id);
        $request->validate([
            'ipv4' => [
                'required_without:ipv6',
                'ipv4',
                'nullable',
                Rule::unique('servers')->ignore($server->id),
            ],
            'ipv6' => [
                'required_without:ipv4',
                'ipv6',
                'nullable',
                Rule::unique('servers')->ignore($server->id),
            ],
            'location' => 'required|string',
            'description' => 'required|string',
        ]);
        
        $server->update($request->all());
        return $server;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $server = Server::destroy($id);
        return $server;
    }
}
