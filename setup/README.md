# Setup

In this folder you can find an example systemd service file.

The service assumes that application files are stored in /opt/zonemta and config directory resides in /etc/zonemta

**NB!** when running as systemd service, do not forget to edit user info in config

**zonemta.toml**

```toml
name="ZoneMTA"
user="zonemta"
group="zonemta"
...
```

You probably also want to change the default feeder port number and host

**interfaces/feeder.toml**

```toml
[feeder]
enabled=true
...
host="0.0.0.0"
port=25
```

If you do not use authentication then you either want to accept connections only from localhost or use a firewall to disable unauthorized access to the service.
