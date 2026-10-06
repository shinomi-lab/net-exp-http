### tshark メモ

仮想NICが`vmenet1`の場合


キャプチャパケットをファイルに記録する。

```shark
tshark -i vmenet1 -w output.pcap
```

記録したファイルから特定のパケットの中身を見る。

```
tshark -r output.pcap -Y frame.number == 50 -V
```

再送制御のパケットを観測する。

```shell
tshark -i vmenet1 -f tcp port 3000 -Y tcp.analysis.retransmission
```

