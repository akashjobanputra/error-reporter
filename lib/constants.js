//constant file
module.exports = {
    errorLevels: {
        critical: 0, // trigger api service restart
        high: 1, // Admin (Generic) + Dev Team (Stack Trace)
        devOnly: 2,
        logOnly: 3,
        ignore: 4,
        silent: 5
    },
    severityTitles: ["CRITICAL", "HIGH", "DEVONLY", "LOGONLY", "IGNORE", "SILENT"],
    HttpStatus: {
        BadRequest: 400,
        Forbidden: 403,
        Unauthorized: 401,
        NotFound404: 404,
        InternalServerError: 500,
        Success: 200,
        noDataFound: 204,
        dbError: 503,
        conflict: 409,
        temporaryRedirect: 302,
    }
};
