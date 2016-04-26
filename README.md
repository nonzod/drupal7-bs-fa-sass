# Ambiente base per Bootstrap + Fontawesome

Ambiente di sviluppo per progetti Bootstrap + Fontawesome, i task sono gestiti da Gulp e le librerie da Bower.

I file da modificare sono quelli dentro *resources/*, questi file vengono compilati e copiati in *public/*,
il browser utilizzerà solo i files in *public*!

## SASS Tools

Per installare tutti i moduli node necessari

```
npm install
```

Per scaricare Bootstrap e Fontawesome eseguire il task *default*

```
gulp default
```

### Tasks

* *bower* : Installa le dipendenze Bower
* *fonts* : Copia i fonts in public/
* *sass* : Compila i file SCSS
* *watch* : Rimane in esecuzione, compila i file SCSS e combina i file JS ad ogni modifica
* *scripts* : Combina i files javascript
* *combineMq* : Ottimizzazioni al file css compilato e minifica
* *combineJs* : Ottimizzazioni al file js minifica

Task combinati

* *default*: esegue "bower" e "icons", utile per il setup iniziale
* *deploy*: esegue "bower", "fonts", "sass", "combineMq", "script" e "combineJs", prepara tutto per il deploy


## SASS:Watch error (ENOSPC)

In caso di errore: ENOSPC

```
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

Riferimento: https://github.com/gulpjs/gulp/issues/217
