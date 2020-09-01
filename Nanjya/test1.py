#_*_coding:utf-8_*_                                                                                                                     
#画像を表示する                                                                                                                         
import sys
import pygame
from pygame.locals import *


pygame.init() #pygameの初期化                                                                                                           
screen = pygame.display.set_mode((800, 600)) #ウィンドウの大きさ                                                                       
pygame.display.set_caption("PyGame") #タイトルバー                                                                                      
image = pygame.image.load("./images/bo.png") #画像を読み込む(今回追加したとこ)                                                                             


# mainループ                                                                                                                           
def main():
    while True:
        screen.fill((0,0,0)) #ウィンドウの背景色                                                                                       
        #イベントの取得                                                                                                                 
        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit() #閉じるボタンが押されたらプログラムを終了                                                                 
                sys.exit
                break
        screen.blit(image, (100,100)) #画像を描画(今回追加したとこ)
        pygame.display.update()

if __name__ == '__main__':
    main()
