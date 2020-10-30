# -*- coding: utf-8 -*-ß
import sys

VOCAB_SIZE = 83 # 語彙数(今回はutf-8の平仮名のみの対応)

class TrieNode:
    # トライ木の1ノードを表すクラス
    def __init__(self, item = None):
        self.item = item
        self.children = [-1 for i in range(VOCAB_SIZE)]

    def __str__(self):
        # item:登録されている単語，children:ノードの子を登録
        ret = ""
        ret = ret + "item = {}\n".format(self.item)
        ret = ret + "children = \n{}".format(self.children)
        return ret

class Trie:
    # トライ木を表すクラス
    def __init__(self):
        root = TrieNode()
        self.nodes = [root]

    def __add_node(self, node):
        self.nodes.append(node)
        return len(self.nodes) - 1

    # キーはutf-8で算出
    def __get_char_num(self, c):
        return ord(c) - ord('ぁ')

    def insert(self ,word, char_index=0, node_index=0):
        char_num = self.__get_char_num(word[char_index])
        next_node_index = self.nodes[node_index].children[char_num]
        if next_node_index == -1:
            # 現在のノードにword[char_index]での遷移がなかった場合
            new_node = TrieNode()
            next_node_index = self.__add_node(new_node)
            self.nodes[node_index].children[char_num] = next_node_index

        if char_index == len(word) - 1:
            # 最後の文字だった場合
            self.nodes[next_node_index].item = word
        else:
            self.insert(word, char_index+1, next_node_index)

    def query(self, word):
        node_index = 0
        back_item = []
        word_len, word_reside, flag, flagJ, count = len(word), 0, 0, 0, 0

        # 先頭の文字から探索していき，単語がないと判断された場合，次の文字から再度探索を行う
        while(1):
            node_index = 0
            for j in range(word_reside, word_len):
                char_num = self.__get_char_num(word[j])
                tmp_node = self.nodes[node_index]

                befor_index = node_index
                node_index = tmp_node.children[char_num]
                
                if node_index == -1:# 子がない場合 break
                    # １つ前の節で単語がある場合，その単語と一致したと判断
                    if befor_index > 0:
                        node_index = befor_index
                        word_reside = j
                    else:
                        if j == word_len - 1: flagJ = 2
                        word_reside = j+1
                    break
                else:# 子がある場合
                    if j == word_len - 1: flag = word_len + 1
                    else: flag = 1
            
            # 辞書に単語がある場合は，back_itemに追記していく
            if node_index != -1 and self.nodes[node_index].item != None:
                back_item.append(self.nodes[node_index].item)
                count = count + 1
            if flag == word_len + 1 or flagJ == 2: break #　探索済
            elif (word_reside + 1) == word_len and flagJ == 0: flagJ = 1
            elif flagJ == 1: break

        # 出力結果がない場合はNone, ある場合は単語群を返す 
        if flag == 0 or count == 0:
            return None
        else:
            return back_item

def main(word):
    trie = Trie()
    
    f = open('text.txt', 'r', encoding='UTF-8')

    data = f.read()
    print("入力辞書：%s" % data)
    data2 = data.split(",")
    
    #　辞書の単語群をトライ木に登録
    for i in range(len(data2)):
        trie.insert(data2[i])

    print("入力文：%s" % word)
    print("出力結果：{}".format(trie.query(word)))

    f.close()


if __name__ == '__main__':
    # 平仮名ではないとき強制終了
    for c in sys.argv[1]:
        if ord(c) > 12435 or ord(c) < 12353:
            print("平仮名ではありません")
            sys.exit()

    main(sys.argv[1])