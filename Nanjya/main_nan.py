
#狐がクリックされたら「ナイスですね！」
#間違えてクリックしたら「惜しい!また挑戦してね！」と表示
#クリックするたび、狐が移動してゲーム再開

from random import randint
from pgzrun import *
#randomモジュールからimportしてくる

fox = Actor("bo",(50,50))
#Actor で画像ファイル名を宣言し、変数foxに代入
def draw():
	#画面に絵を描く（表示）draw()という関数を定義
    screen.clear()
    #画面表示をきれいに　今はこういうものがある程度で
    fox.draw()
    #変数foxに入れられたファイル画像を呼び出し表示

def replace_fox():
	#絵の位置を置き換える関数　replace_foxという関数を定義
	#fox.x = 400
	#x座標の位置
	#fox.y = 500
	#y座標の位置
	fox.x = randint(10, 500)
	fox.y = randint(10, 500)

def on_mouse_down(pos):
#クリックされたら　→ on_mouse_down() ビルトイン関数
#pos → ボタンが押されたときのマウス・ポインタの位置を示す
	if fox.collidepoint(pos):
		print("ナイスですね!")
		replace_fox()
	else:
		print("惜しい!また挑戦してね！")
		replace_fox()


replace_fox()
    #replace_fox()で呼び出し、表示させる