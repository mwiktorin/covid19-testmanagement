class Error {
  constructor (errno, additionalInfo) {
    this.errno = errno || 500;
    this.additionalInfo = additionalInfo;
  }

  get message () {
    return `Error – ${errors[errno]} (Code ${this.errno})${this.additionalInfo ? `: ${this.additionalInfo}` : ''}`;
  }

  applyToResponse(res) {
    return res.status(this.errno);
  }
}

const errors = {
  403: 'Not Authorized',
  404: 'Not Found',
};


class NotAuthorized extends Error {
  constructor (what) {
    super(403, what);
  }
}

class NotFound extends Error {
  constructor (what) {
    super(404, what);
  }
}

function defaultErrorWrapper (fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (err) {
      console.log(err);
      if (err.errno) {
        err.applyToResponse(res).send();
      } else {
        res.sendStatus(500);
      }
    }
  }
}

module.exports = {
  Error,
  NotAuthorized,
  NotFound,

  defaultErrorWrapper
}
