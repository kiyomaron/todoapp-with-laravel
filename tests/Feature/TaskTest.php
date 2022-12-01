<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Contracts\Auth\Authenticatable;
use Tests\TestCase;
use App\Models\Task;
use App\Models\User;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $user = factory(User::class)->create();
        $this->actingAs($user);
    }
    /**
     * @test
     */
    public function 一覧を表示できる()
    {
        $tasks = Task::factory()->count(10)->create();
        // dd($tasks->toArray());

        $response = $this->getJson('api/tasks');
        
        $response
            ->assertOk()
            ->assertJsonCount($tasks->count());
    }

    /**
     * @test
     */
    public function 登録することができる()
    {
        $data = [
            'title' => 'テスト投稿'
        ];

        $response = $this->postJson('api/tasks', $data);
        
        // dd($response->json());
        $response
        ->assertCreated()
        ->assertJsonFragment($data);
    }

    /**
     * @test
     */
    public function 更新することができる()
    {
        $task = Task::factory()->create();
        // dd($tasks->toArray());

        $task->title = '書き換え';

        
        $response = $this->patchJson("api/tasks/{$task->id}", $task->toArray());
        // dd($response->json());
        $response
            ->assertOk()
            ->assertJsonFragment($task->toArray());
    }

    /**
     * @test
     */
    public function 削除することができる()
    {
        $tasks = Task::factory()->count(10)->create();

        $response = $this->deleteJson("api/tasks/1");
        $response->assertOk();

        $response = $this->getJson("api/tasks");
        $response->assertJsonCount($tasks->count() -1);

    }

    /**
     * @test
     */
    public function タイトルが空の場合は登録できない()
    {
        $data = [
            'title' => ''
        ];

        $response = $this->postJson('api/tasks', $data);
        
        // dd($response->json());
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'タイトルは必須項目です。'
            ]);

    }

    /**
     * @test
     */
    public function タイトルが255文字の場合は登録できない()
    {
        $data = [
            'title' => str_repeat('あ',256)
        ];

        $response = $this->postJson('api/tasks', $data);
        
        //dd($response->json());
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'タイトルの文字数は、255文字以下でなければいけません。'
            ]);

    }
    
}
