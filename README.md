# zone-mta-template

Skeleton application for [ZoneMTA](https://github.com/zone-eu/zone-mta) based SMTP servers.

## What is this?

This is a skeleton application to run ZoneMTA based MTA/MSA servers. Download it, tweak it and run it to have a high performance SMTP server.

## What is ZoneMTA?

[ZoneMTA](https://github.com/zone-eu/zone-mta) is a modern open source MTA/MSA server. You can use it as a SMTP smarthost or a MSA host, it is fast and scalable, you can send many millions of emails a day with it.

ZoneMTA also comes with features usually available only for commercial SMTP servers like Virtual MTAs (or "sending zones" in ZoneMTA speak), IP pooling and rotation, IP warm-up, IP blacklist detection and mitigation, clustered setup with a shared queue and so on. ZoneMTA is battle tested with more than 100 million successful deliveries from a single server.

## What it is not?

ZoneMTA is not a MX server. You can use it as such but it lacks all the utilities that are needed to fight inbound spam. Better look at [Haraka](http://haraka.github.io/) if you are in need of a good MX server.

It is also not meant to deliver marketing emails. You can obviously do it but the intended use case is to cater the needs of an ISP, where a continous and neverending flow of variously sized messages (from simple "thanks!" to 30MB PDF attachments) are sent by its users. Marketing emails usually mean huge spikes where a large amount of rather small messages are inserted to the sending queue at once. ZoneMTA should handle this at ease as well, even though it was built for something different.

## Requirements

* **Node.js**
* **MongoDB**
* **Redis**

## Usage

Fetch the ZoneMTA application template

```
$ git clone git://github.com/zone-eu/zone-mta-template.git
$ cd zone-mta-template
$ npm install --production
$ npm start
```

If everything succeeds then you should have a SMTP relay with no authentication running on localhost port 2525 (does not accept remote connections).

## Configuration

All configuration files reside in the [config](.config) directory. If you want to move that directory to somewhere else then you can do that, though you would have to provide the new location as a command line argument.

```
$ mv config /etc/zonemta
$ node index.js --config=/etc/zonemta/zonemta.toml
```

You can find an example systemd unit file from the [setup](./setup) folder.

To see the current config run the following. This shows the fully merged config tree:

```
$ npm run config
> { name: 'ZoneMTA',
  ident: 'zone-mta',
  dbs:
   { mongo: ...
```

## Adding plugins

You can either add a plugin to the plugins folder and in that case the plugin config id would be the name of the plugin without extension.

Alternatively you could install an existing plugin from npm:

```
npm install zonemta-some-plugin --save
```

In that case the plugin configuration id would be `["modules/zonemta-some-plugin"]`

Store plugin configuration files to [config/plugins](./config/plugins) and browse existing ones for example.
