﻿'use strict';
app.factory('reservationService', ['$http', '$q', 'localStorageService', 'servicesConnect', function ($http, $q, localStorageService, servicesConnect) {

    var serviceBase = servicesConnect.apiFutbolPlay;
    var reservationService = {};
    var authData = localStorageService.get('authorizationData');
    if (authData) {

        var _ListUsers = function () {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/users', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
                deferred.resolve(results);
            }, function errorCallback(err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        var _ListReservationsApp = function (date, id_users, id_pitch, hour, id_place) {
            var data = "date=" + date + "&id_users=" + id_users + "&id_pitch=" + id_pitch + "&hour=" + hour + "&id_place=" + id_place;
            var deferred = $q.defer();
            $http.post(serviceBase + 'api/reservations/customer/single', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
                deferred.resolve(results);
            }, function errorCallback(err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        var _ListUserOffline = function () {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/users_offline', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
                deferred.resolve(results);
            }, function errorCallback(err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        var _ListUserAppReservation = function (id_place, date) {
            var data = "id_place=" + id_place + "&date=" + date;
            var deferred = $q.defer();
            $http.post(serviceBase + 'api/reservations/users/single', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
                deferred.resolve(results);
            }, function errorCallback(err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        reservationService.getUsers = _ListUsers;        
        reservationService.saveReservationUserApp = _ListReservationsApp;
        reservationService.getUsersOffline = _ListUserOffline;
        reservationService.getUserAppReservation = _ListUserAppReservation;
    }

    var _InfoPlace = function (id_place) {
        var deferred = $q.defer();
        $http.get(serviceBase + 'api/places/' + id_place).then(function (results) {
            deferred.resolve(results);
        }, function errorCallback(err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _ListPitch = function (id_place) {
        var deferred = $q.defer();
        $http.get(serviceBase + 'api/pitches/single/' + id_place).then(function (results) {
            deferred.resolve(results);
        }, function errorCallback(err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _ListBusy = function (id_place, date) {
        var data = "id_place=" + id_place + "&date=" + date;
        var deferred = $q.defer();
        $http.post(serviceBase + 'api/reservations/customer/busy/single', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
            deferred.resolve(results);
        }, function errorCallback(err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _GetPrice = function (id_pitch, hour, date) {
        var deferred = $q.defer();
        var data = "id_pitch=" + id_pitch + "&hour=" + hour + ":00:00" + "&date_insert=" + date;
        $http.post(serviceBase + 'api/schedulers/price', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
            deferred.resolve(results);
        }, function errorCallback(err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _ListUserByNameAndIdPlace = function (name, id_users_type) {
        var data = "name=" + name + "&id_users_type=" + id_users_type;
        var deferred = $q.defer();
        $http.post(serviceBase + 'api/users/bynameandidplace', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
            deferred.resolve(results);
        }, function errorCallback(err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _ListStatus = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'api/status_type/customers', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
            deferred.resolve(results);
        }, function errorCallback(err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _DetailReservation = function (id_reservation) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http.get(serviceBase + 'api/reservations/detail/' + id_reservation, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
            deferred.resolve(results);
        }, function errorCallback(err, status) {
            deferred.reject(err);
        });
        return promise;
    }

    var _ListReservationsUserOffline = function (date, id_users_offline, id_pitch, hour, id_place, price, id_tipo_user, description) {
        var tipo_user = "id_users_offline";
        if (id_tipo_user == "1") {
            tipo_user = "id_users";
        }
        var data = "date=" + date + "&" + tipo_user + "=" + id_users_offline + "&id_pitch=" + id_pitch + "&hour=" + hour + "&id_place=" + id_place + "&value=" + price + "&description=" + description;
        var deferred = $q.defer();
        $http.post(serviceBase + 'api/reservations/customer/single', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
            deferred.resolve(results);
        }, function errorCallback(err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    
    var _SaveNewStatus = function (status, id_reservation, description, value) {
        var deferred = $q.defer();
        var data = "status=" + status + "&id_reservation=" + id_reservation + "&description=" + description + "&value=" + value;
        $http.post(serviceBase + 'api/reservations/UpdateReservation', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
            deferred.resolve(results);
        }, function errorCallback(err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _NewUserOffline = function (name, phone, email, id_place) {
        var deferred = $q.defer();
        var data = "name=" + name + "&phone=" + phone + "&email=" + email + "&id_place=" + id_place;
        $http.post(serviceBase + 'api/users_offline', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (results) {
            deferred.resolve(results);
        }, function errorCallback(err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    reservationService.getUserByNameAndIdPlace = _ListUserByNameAndIdPlace;
    reservationService.saveReservationUserOffline = _ListReservationsUserOffline;
    reservationService.getPrice = _GetPrice;
    reservationService.getPlace = _InfoPlace;
    reservationService.getPitch = _ListPitch;
    reservationService.getBusy = _ListBusy;
    reservationService.listStatus = _ListStatus;
    reservationService.getDetail = _DetailReservation;
    reservationService.saveStatus = _SaveNewStatus;
    reservationService.saveNewUser = _NewUserOffline;

    return reservationService;
}]);