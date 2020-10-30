# 1. プログラム
## 1.1. 実行方法

```bash
$ python3 Trytree.py あすははやい
入力辞書：あさ,あす,いつも,おきた,きょう,は,はやい,はやく
入力文：あすははやい
出力結果：['あす', 'は', 'はやい']
```
`入力文`から`入力辞書`に登録されている単語を`出力結果`として表示する．一致する単語がない場合は，`None`と表示する．
`入力文`は平仮名のみに対応し，平仮名以外を入力すると強制終了する．

## 1.2. ファイル構造
```bash
├── README.md
├── Trytree.py
└── text.txt
```
`text.txt`では`入力辞書`で使用する単語群を事前登録する．


# 2. 参考文献

1. アルゴリズムロジック, 2020.9.2, 「トライ木(Trie木)の解説と実装」, <https://algo-logic.info/trie-tree/>, (2020.10.30 閲覧)

1. 株式会社ライトコード, 2020.8.19, 「トライ木で高速な辞書を作ってみた！」, <https://rightcode.co.jp/blog/information-technology/trie-fast-dictionary-implementation-1>, (2020.10.30 閲覧)

1. ASH, 1995-2002, 「Unicode対応 文字コード表」, <http://ash.jp/code/unitbl21.htm>, (2020.10.30 閲覧)