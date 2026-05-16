# Debug Log

This is the distilled path that led to a working Docker setup.

## Initial State

The local directory contained an existing guide about using Docker through Lima on macOS.

The machine had:

```text
brew: /usr/local/bin/brew
limactl: /usr/local/bin/limactl
docker: missing
lima instance: docker, stopped
```

Starting Lima failed:

```text
failed to find the QEMU binary for the architecture "x86_64":
exec: "qemu-system-x86_64": executable file not found in $PATH
```

## Attempts

### Docker Desktop

Docker Desktop was not viable because the current cask refused old macOS:

```text
This software does not run on macOS versions older than Sonoma.
```

### Colima

Colima was considered, but it still depends on Lima/QEMU for this setup and did not remove the core issue.

### Homebrew QEMU

Homebrew repeatedly entered long source-build paths on macOS 12. It pulled dependencies such as `z3`, `llvm`, `gnutls`, and `python@3.14`, making it slow and brittle.

### QEMU Master from Source

QEMU master failed with the local Apple clang:

```text
You either need GCC v10.4 or Clang v10.0 (or XCode Clang v15.0) to compile QEMU
```

The machine had Apple clang 14.

### QEMU 8.2.3 from Source

QEMU 8.2.3 was compatible with the local compiler.

The first source build hit:

```text
found no usable distlib, please install it
```

Fixed with:

```bash
python3 -m pip install --user --break-system-packages distlib
```

The next failure was:

```text
fatal error: 'nettle/sha.h' file not found
```

Fixed by configuring QEMU with:

```bash
--disable-nettle
```

That build produced `qemu-system-x86_64`, but Lima then failed:

```text
network backend 'user' is not compiled into this binary
```

The QEMU binary was missing libslirp support. The final fix was:

```bash
brew install libslirp
../configure --target-list=x86_64-softmmu --disable-nettle --enable-slirp
make -j4
make install
```

Confirmed with:

```bash
qemu-system-x86_64 -netdev help
```

The output must include:

```text
user
```

## Final Working State

```text
qemu-system-x86_64: /usr/local/bin/qemu-system-x86_64
QEMU version: 8.2.3
Lima instance: docker, Running
Docker Engine: 29.5.0
Docker context inside VM: rootless
Host docker wrapper: /usr/local/bin/docker
launchd agent: com.vitaair.docker-lima-start
```

`docker ps` returned successfully.
