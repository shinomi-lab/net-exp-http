# 1. enp0s2 の根元に優先度付きキュー（prio）を設定
sudo tc qdisc add dev enp0s2 root handle 1: prio

# 2. 妨害用のクラス（1:1）を作成し、そこに 30% のパケットロス（netem loss）を紐付ける
sudo tc qdisc add dev enp0s2 parent 1:1 handle 10: netem loss 30%

# 3. フィルターを作成：送信元ポート（sport）が 3000番 のIPパケットだけを妨害用クラス（1:1）に流す
sudo tc filter add dev enp0s2 protocol ip parent 1:0 prio 1 u32 match ip sport 3000 0xffff flowid 1:1

