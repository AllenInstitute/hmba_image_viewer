from flask import Flask, render_template, make_response, request, url_for
app = Flask(__name__)
import os
from io import StringIO
import pathlib
import tempfile
import os

def mkstemp_clean(
    dir=None,
    prefix=None,
    suffix=None):

    raw = tempfile.mkstemp(dir=dir,prefix=prefix,suffix=suffix)

    # tempfile.mkstemp opens a file descriptor for the temporary file;
    # close it.
    os.close(raw[0])

    # delete the temporary file, so we can use it to create a symlink
    os.unlink(raw[1])

    return pathlib.Path(raw[1])

@app.route("/")
def render_main():

    # get path to static/ resources directory
    static_dir = pathlib.Path('static')
    assert static_dir.is_dir()

    # create a temporary path name
    tmp_path = mkstemp_clean(
            dir=static_dir,
            prefix='silly_',
            suffix='.jpg')
   
    src = pathlib.Path(
        'raw/dummy_64.jpg')

    assert src.is_file()

    # create a symlink to the actual image in static/
    tmp_path.symlink_to(src.resolve().absolute()) 

    return render_template(
        "main.html",
        img_name=tmp_path.name)


if __name__ == '__main__':
   app.run()
