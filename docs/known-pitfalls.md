# Known Pitfalls

## Docker Desktop is not a universal fallback

On macOS 12, the current Docker Desktop cask may fail with:

```text
This software does not run on macOS versions older than Sonoma.
```

For older Intel Macs, Lima + QEMU can be the more practical path.

## QEMU must include user networking

Lima's default QEMU command uses:

```text
-netdev user
```

If QEMU was built without libslirp, Lima exits almost immediately:

```text
network backend 'user' is not compiled into this binary
```

Verify:

```bash
qemu-system-x86_64 -netdev help | grep user
```

Fix:

```bash
brew install libslirp
../configure --target-list=x86_64-softmmu --disable-nettle --enable-slirp
make -j4
make install
```

## QEMU master may be too new

On old macOS/Xcode command line tools, QEMU master may require a newer compiler. QEMU 8.2.3 worked for this setup.

## Python distlib can block QEMU mkvenv

If QEMU configure reports:

```text
found no usable distlib
```

Install:

```bash
python3 -m pip install --user --break-system-packages distlib
```

## Homebrew source builds may be slow on macOS 12

Homebrew may fall back to source builds because macOS 12 is a Tier 3 configuration. That can mean long builds of dependencies such as `z3`, `llvm`, and `python`.

## launchd has a tiny PATH

Interactive shells may find `limactl`, while launchd scripts cannot. Set PATH explicitly in startup scripts:

```bash
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
```
