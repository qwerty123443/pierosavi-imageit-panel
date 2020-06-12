"use strict";

System.register(["lodash", "app/plugins/sdk", "./libs/interact", "app/core/utils/kbn"], function (_export, _context) {
  "use strict";

  var _, MetricsPanelCtrl, kbn, copyProps, panelDefaults, mappingOperators, ImageItCtrl;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function isEqualTo(a, b) {
    // Could be ok if Im comparing strings and numbers
    // eslint-disable-next-line eqeqeq
    return a !== undefined && b !== undefined ? a == b : false;
  }

  function isGreaterThan(a, b) {
    return a !== undefined && b !== undefined ? a > b : false;
  }

  function isLessThan(a, b) {
    return a !== undefined && b !== undefined ? a < b : false;
  }

  function _getMappingOperators() {
    return mappingOperators;
  }

  function getRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  function ValueColorMapping() {
    // TODO: check if it doesnt exist yet
    this.id = getRandomId();
    this.name = undefined;
    this.operatorName = mappingOperators[0].name;
    this.compareTo = undefined;
    this.isSensorFontBold = false;
    this.fontColor = '#000';
    this.bgColor = '#fff';
    this.nameBlink = false;
    this.valueBlink = false;
    this.bgBlink = false;
  }

  function Sensor() {
    this.metric = '';
    this.xlocation = 50;
    this.ylocation = 25;
    this.bgColor = 'rgba(64,64,64,1.000)';
    this.fontColor = 'rgba(255,255,255,1.000)';
    this.size = 14;
    this.visible = true;
    this.renderValue = true;
    this.valueFormatted = '';
    this.valueUnit = '';
    this.displayName = '';
    this.link_url = '';
    this.resolvedLink = '';
    this.rectangular = true;
    this.valueMappingIds = [];
    this.isBold = false;
    this.id = getRandomId();
    this.unitFormat = 'none';
    this.decimals = 2;
    this.sizeCoefficient = undefined;
  }

  function normalizeColor(color) {
    if (color.toLowerCase() === 'green') {
      return 'rgba(50, 172, 45, 0.97)';
    }

    if (color.toLowerCase() === 'orange') {
      return 'rgba(237, 129, 40, 0.89)';
    }

    if (color.toLowerCase() === 'red') {
      return 'rgba(245, 54, 54, 0.9)';
    }

    return color.toLowerCase();
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_libsInteract) {}, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }],
    execute: function () {
      copyProps = ['size', 'bgColor', 'fontColor', 'visible', 'renderValue', 'valueUnit', 'displayName', 'link_url', 'link_hover', 'resolvedLink', 'rectangular', 'valueMappingIds', 'isBold', 'unitFormat', 'decimals', 'sizeCoefficient'];
      panelDefaults = {
        colorMappings: [],
        colorMappingMap: [],
        valueMappings: [],
        metricValues: [],
        seriesList: [],
        series: [],
        bgimage: '',
        bgimagetable: '',
        realbgimage: '',
        sensors: [],
        templateSrv: null,
        sizecoefficient: 20,
        islocked: false,
        islockvisible: true
      };
      mappingOperators = [{
        name: 'equal',
        operator: '=',
        fn: isEqualTo
      }, {
        name: 'greaterThan',
        operator: '>',
        fn: isGreaterThan
      }, {
        name: 'lessThan',
        operator: '<',
        fn: isLessThan
      }];

      _export("ImageItCtrl", ImageItCtrl =
      /*#__PURE__*/
      function (_MetricsPanelCtrl) {
        _inherits(ImageItCtrl, _MetricsPanelCtrl);

        function ImageItCtrl($scope, $injector, $sce, templateSrv) {
          var _this;

          _classCallCheck(this, ImageItCtrl);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageItCtrl).call(this, $scope, $injector));

          _.defaults(_this.panel, panelDefaults);

          _this.templateSrv = templateSrv;
          _this.$sce = $sce;

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_assertThisInitialized(_this)));

          _this.events.on('panel-initialized', _this.render.bind(_assertThisInitialized(_this)));

          _this.events.on('data-received', _this.onDataReceived.bind(_assertThisInitialized(_this)));

          _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_assertThisInitialized(_this)));

          return _this;
        }

        _createClass(ImageItCtrl, [{
          key: "onDataReceived",
          value: function onDataReceived(dataList) {
            var dataListLength = dataList.length;
            this.panel.metricValues = [];

            for (var series = 0; series < dataListLength; series += 1) {
              this.panel.metricValues.push({
                name: dataList[series].target,
                value: dataList[series].datapoints[dataList[series].datapoints.length - 1][0]
              });
            }

            this.render();
          }
        }, {
          key: "deleteSensor",
          value: function deleteSensor(index) {
            this.panel.sensors.splice(index, 1);
          }
        }, {
          key: "copySensor",
          value: function copySensor(index) {
            var _this2 = this;

            var tmp1 = new Sensor();
            copyProps.forEach(function (prop) {
              tmp1[prop] = _this2.panel.sensors[index][prop];
            });
            var ii = index + 1;

            while (ii < this.panel.sensors.length) {
              var tmp2 = this.panel.sensors[ii];
              this.panel.sensors[ii] = tmp1;
              tmp1 = tmp2;
              ii += 1;
            }

            this.panel.sensors.push(tmp1);
          }
        }, {
          key: "addSensor",
          value: function addSensor() {
            this.panel.sensors.push(new Sensor());
            this.render();
          }
        }, {
          key: "moveSensorUp",
          value: function moveSensorUp(index) {
            var sensor = this.panel.sensors[index];
            this.panel.sensors.splice(index, 1);
            this.panel.sensors.splice(index - 1, 0, sensor);
          }
        }, {
          key: "moveSensorDown",
          value: function moveSensorDown(index) {
            var sensor = this.panel.sensors[index];
            this.panel.sensors.splice(index, 1);
            this.panel.sensors.splice(index + 1, 0, sensor);
          }
        }, {
          key: "onInitEditMode",
          value: function onInitEditMode() {
            this.addEditorTab('Sensor', 'public/plugins/pierosavi-imageit-panel/editor.html', 2);
            this.addEditorTab('Value Mapping', 'public/plugins/pierosavi-imageit-panel/mappings.html', 3);
            this.unitFormats = kbn.getUnitFormats();
            this.render();
          }
        }, {
          key: "toggleBlock",
          value: function toggleBlock() {
            this.panel.islocked = !this.panel.islocked;
            this.render();
          }
        }, {
          key: "makeSelectionList",
          value: function makeSelectionList() {
            var _list;

            _list.push({
              "name": "Custom URL"
            });

            _list.push(angular.copy(metricMap));

            return _list;
          }
        }, {
          key: "link",
          value: function link(scope, elem, attrs, ctrl) {
            var panelContainer = elem.find('.pierosavi-imageit-panel')[0];
            var image = panelContainer.querySelector('#imageit-image');
            var draggableElement = '#imageit_panel' + ctrl.panel.id + '_sensor';

            function render() {
              if (ctrl.panel.bgimage === '' && ctrl.panel.bgimagetable === '') {
                return;
              }

              var imageWidth = image.offsetWidth;
              var imageHeight = image.offsetHeight;

              var metricMap = _.keyBy(ctrl.panel.metricValues, function (value) {
                return value.name;
              });

              var valueMappingsMap = _.keyBy(ctrl.panel.valueMappings, function (mapping) {
                return mapping.id;
              });

              var mappingOperatorsMap = _.keyBy(mappingOperators, function (operator) {
                return operator.name;
              });

              if (ctrl.panel.bgimage == "") {
                if (ctrl.panel.bgimagetable != undefined) {
                  var noImgb64 = "iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAAAAADuvYBWAAAACXBIWXMAAC4jAAAuIwF4pT92AAAYV0lEQVR42u3deXxU5b0G8CeAbDUqvRrFxqqpohcrtlypVErLBy9Sr9dSqlBr40VtQdorKPoRiEUpYpWqVQStu6jUDUVRcQEqVxEEQQSDLAYIWwIkIXsyk8z23D/eWd4zS2YmTlIMz/ef5OznvL9zzvvOOe97XkBERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERFIVIMmHOthBXblkV4PX31T58b9wHzwk+WQqc3bRWZgBr/6yCwB063baN2J3O8UbOYIkyV1xl1hHkm8q0Jbnr/hmXTudWph22j8Uz1T0u/wbtsMtnqK/GvmGQprc9T0BwP3PtYd6Hf3ND3qPGW0Q9MGdAOzqSEE/BwBw910d40rHuQ/dmPEtrupwV3ovADjwzYl5i3k6gDGDdPdOqhsAlHeIgtzBAIBj/6qYJtUZAJo7RNBrVgDAhbcrqClhhwh611uqAWTdkJfCWvIeWLGrxhPwucq+fGNcq/Yje/b68qZAc9WWF8IZSsGKfS6/p3bnO/lxsp2Fn5fWN/mbaw+snX9JnNWNfquo2htwH1x7b3aiLRYs3V7VHPA27l8/f1icI5r70Y5ql8/vrile/feBrTmir58mAHD1W9trPH5X1dY3R8cmwrvFdV6/u2zjvP4ZOBNGkOQ+3EuSfCdqYuzDmf7vNNCye1aLK3c8hvWRDGQDtxwML17/MAAgvyg8xvtBVOTu2Wtvz7M2+nfy0DX+8NT90wF8RpKL7VmeKLPW4Ft7lXMFAz9w2VvwrroywcFMpNO+VNLkapKk8xY63DHOR5J5wOC1kQPxftLPscSwdYHwtMZXkM5j2MRBPwBsIEnvuCRBL6iKOnKu75dq0F0kORSzvNbSgacAFDhSfaO9gr6fR2+v4V7HFsY7dsj/ClBEkgsic1y6PWoN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FvvihOxse8A80z064Qz1pQDwvdZs/KFmALlXYWwXhN4AK+jtoKQcAE5zjBt+sj20OSYXj8r0twDAyde1YuPrvgCQNQoXAnD/TUFvN9sBIHuaPepGx2GWNAPAd+1Rt/W2h0zXttc4VzukauPTw5Nu/A0AOH/E6VCFyDTFVpdK0sOww0zTt7Q1Zlijo7oU9pHkQbsYt4+O6lI7SdLn7Jz1Q5L+1S3slHGAJJeT5K3Qld5u7q0GgO/PCY/IfiTqwWoJAJw4NzJiQa5zhpcBoPNMuy3T4z8F0Cn527qPAfNW/eB9Cno7/lD/AACyxj0cHB65/kxUVNtzrAQAjLk5ODh03c+wr8JOjT8VAkDO8+HamHmLx2YB2P+npFv/uze4nk8O3xTqgB3sYsqQ4wF0+9+LV20t6X3awO93B54ba89w5++PA5B9z68+21Z5Qt4F/XvCd/8UxyUw6dVvAzjp/qtXrvyofPDQgRf0AgDvrORVIj7cZKrJ+Z5SNt2OeTpwqyfqVfgK1Dvams2Nflc+D3tI8p7wKsaEW8MFwu0mvZHJifN0TDczf3kYp2+H/NDQfQ84K11svCLq7dgER+1m8OVrzSP7SLW75/JD1eqyQklUeXtBKhufYR4JLlXQ29nUCVZbQvdrPyyPfiV60bNWLYvymb8B3IDj3dw7Zz5x0FFSWHRxinUcVwFA/SxIu7tl+Z4Gn7+pYtP8QQDgiW5K3OeZdWUNPp+rdPW9Cdcx+b2iyma/z11VtHxmTspbXkmSSxWBfz1P3PbjbWFoE0nfKCX5kRT0d5O1nlee3uFcfhEAPK+EOJKu9G0kuQW60o8gH5wFIPB3JcSRc6X3W0OS/OgwT4wuOh8yImfSobrv/Ogn2QBQMUnpcURc6f0jj3Qbxx/uiaE8PdPq73jscN9F3d4zbOvtC6GgHxka9vXq3tlXXfz23UoLERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERGRI93/A13/2G7HqTpBAAAAAElFTkSuQmCC";
                  var bgimgname = ctrl.panel.bgimagetable.replace("string:", "");
                  var b64CameraImg = bgimgname in metricMap ? metricMap[bgimgname].value : "";
                  var img = b64CameraImg != "" && b64CameraImg != " " ? b64CameraImg : noImgb64;
                  ctrl.panel.realbgimage = "data:image/png;base64, " + img;
                }
              } else {
                ctrl.panel.realbgimage = ctrl.templateSrv.replace(ctrl.panel.bgimage);
              }

              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = ctrl.panel.sensors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var sensor = _step.value;

                  _.defaults(sensor, new Sensor());

                  var sizeCoefficient = sensor.sizeCoefficient ? sensor.sizeCoefficient : ctrl.panel.sizecoefficient;
                  sensor.size = imageWidth * sizeCoefficient / 1600;
                  sensor.borderRadius = sensor.rectangular ? '5%' : '50%';
                  sensor.xlocationStr = sensor.xlocation * imageWidth / 100 + 'px';
                  sensor.ylocationStr = sensor.ylocation * imageHeight / 100 + 'px';

                  if (sensor.link_url !== undefined) {
                    sensor.resolvedLink = ctrl.templateSrv.replace(sensor.link_url);
                  } // We need to replace possible variables in the sensors name


                  var effectiveName = ctrl.templateSrv.replace(sensor.metric);
                  var metric = metricMap[effectiveName];
                  var metricValue = metric !== undefined ? metric.value : undefined; // update existing valueMappings

                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = ctrl.panel.valueMappings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var _valueMapping = _step2.value;

                      if (_valueMapping.mappingOperatorName == null) {
                        _valueMapping.mappingOperatorName = mappingOperators[0].name;
                      }

                      if (_valueMapping.id == null) {
                        _valueMapping.id = getRandomId();
                      }
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                        _iterator2["return"]();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }

                  if (sensor.valueMappingIds === undefined) {
                    sensor.valueMappingIds = [];
                  }

                  if (sensor.valueMappingIds.length > 0) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = sensor.valueMappingIds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var mappingId = _step3.value;
                        var valueMapping = valueMappingsMap[mappingId];

                        if (valueMapping === undefined) {
                          break;
                        }

                        var mappingOperator = mappingOperatorsMap[valueMapping.mappingOperatorName];

                        if (mappingOperator.fn(metricValue, valueMapping.compareTo)) {
                          sensor.realFontColor = valueMapping.fontColor;
                          sensor.realBgColor = valueMapping.bgColor;
                          sensor.nameBlink = valueMapping.nameBlink;
                          sensor.valueBlink = valueMapping.valueBlink;
                          sensor.bgBlink = valueMapping.bgBlink;
                          sensor.isBold = valueMapping.isSensorFontBold;
                          break;
                        } else {
                          normalizeSensor(sensor);
                        }
                      }
                    } catch (err) {
                      _didIteratorError3 = true;
                      _iteratorError3 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                          _iterator3["return"]();
                        }
                      } finally {
                        if (_didIteratorError3) {
                          throw _iteratorError3;
                        }
                      }
                    }
                  } else {
                    normalizeSensor(sensor);
                  }

                  if (metricValue === undefined) {
                    sensor.valueFormatted = 'Select a sensor metric';
                  } else {
                    var formatFunc = kbn.valueFormats[sensor.unitFormat];
                    sensor.valueFormatted = formatFunc(metricValue, sensor.decimals);
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              dragEventSetup();
            }

            function normalizeSensor(sensor) {
              // new sensor property so it doesn't lose the original one
              // https://github.com/pierosavi/pierosavi-imageit-panel/issues/4
              sensor.realBgColor = sensor.bgColor;
              sensor.realFontColor = sensor.fontColor;
              sensor.nameBlink = false;
              sensor.valueBlink = false;
              sensor.bgBlink = false;
              sensor.isBold = false;
            }

            function dragEventSetup() {
              if (ctrl.panel.islocked) {
                if (window.interact.isSet(draggableElement)) {
                  window.interact(draggableElement).unset();
                }
              } else if (!window.interact.isSet(draggableElement)) {
                window.interact(draggableElement).draggable({
                  // I dont like it personally but this could be configurable in the future
                  inertia: false,
                  restrict: {
                    restriction: '#draggableparent',
                    endOnly: true,
                    elementRect: {
                      top: 0,
                      left: 0,
                      bottom: 1,
                      right: 1
                    }
                  },
                  autoScroll: true,
                  onmove: function onmove(event) {
                    var target = event.target; // keep the dragged position in the data-x/data-y attributes

                    var datax = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var datay = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy; // translate the element

                    var elementTransform = 'translate(' + datax + 'px, ' + datay + 'px)';
                    target.style.webkitTransform = elementTransform;
                    target.style.transform = elementTransform; // update the position attributes

                    target.setAttribute('data-x', datax);
                    target.setAttribute('data-y', datay);
                  },
                  onend: function onend(event) {
                    var target = event.target;
                    var imageHeight = image.offsetHeight;
                    var imageWidth = image.offsetWidth; // find sensor with the id from the refId attribute on html

                    var sensor = _.find(ctrl.panel.sensors, {
                      'id': event.target.getAttribute('refId')
                    }); // get relative distance in px


                    var datax = target.getAttribute('data-x');
                    var datay = target.getAttribute('data-y'); // get percentage of relative distance from starting point

                    var xpercentage = datax * 100 / imageWidth;
                    var ypercentage = datay * 100 / imageHeight;
                    sensor.xlocation += xpercentage;
                    sensor.ylocation += ypercentage; // reset the starting sensor points

                    target.setAttribute('data-x', 0);
                    target.setAttribute('data-y', 0); // target.style.webkitTransform = '';

                    target.style.transform = '';
                    target.style.left = sensor.xlocation * imageWidth / 100 + 'px';
                    target.style.top = sensor.ylocation * imageHeight / 100 + 'px';
                  }
                });
              }
            }

            this.events.on('render', function () {
              render();
              ctrl.renderingCompleted();
            });
          } //------------------
          // Mapping stuff
          //------------------

        }, {
          key: "addValueMappingMap",
          value: function addValueMappingMap() {
            this.panel.valueMappings.push(new ValueColorMapping());
          }
        }, {
          key: "removeValueMappingMap",
          value: function removeValueMappingMap(index) {
            this.panel.valueMappings.splice(index, 1);
            this.render();
          }
        }, {
          key: "replaceTokens",
          value: function replaceTokens(originalValue) {
            var value = originalValue;

            if (!value) {
              return value;
            }

            value += '';
            value = value.split(' ').map(function (a) {
              if (a.startsWith('_fa-') && a.endsWith('_')) {
                var icon = a.replace(/_/g, '').split(',')[0];
                var color = a.indexOf(',') > -1 ? " style=\"color:".concat(normalizeColor(a.replace(/_/g, '').split(',')[1]), "\" ") : '';
                var repeatCount = a.split(',').length > 2 ? +a.replace(/_/g, '').split(',')[2] : 1;
                a = "<i class=\"fa ".concat(icon, "\" ").concat(color, "></i> ").repeat(repeatCount);
              } else if (a.startsWith('_img-') && a.endsWith('_')) {
                a = a.slice(0, -1);
                var imgUrl = a.replace('_img-', '').split(',')[0];
                var imgWidth = a.split(',').length > 1 ? a.replace('_img-', '').split(',')[1] : '20px';
                var imgHeight = a.split(',').length > 2 ? a.replace('_img-', '').split(',')[2] : '20px';

                var _repeatCount = a.split(',').length > 3 ? +a.replace('_img-', '').split(',')[3] : 1;

                a = "<img width=\"".concat(imgWidth, "\" height=\"").concat(imgHeight, "\" src=\"").concat(imgUrl, "\"/>").repeat(_repeatCount);
              }

              return a;
            }).join(' ');
            return this.$sce.trustAsHtml(value);
          }
        }, {
          key: "getMappingOperators",
          value: function getMappingOperators() {
            return _getMappingOperators();
          }
        }, {
          key: "setUnitFormat",
          value: function setUnitFormat(sensor, subItem) {
            sensor.unitFormat = subItem.value;
            this.render();
          }
        }, {
          key: "setBackgroundImage",
          value: function setBackgroundImage() {
            this.render();
          }
        }]);

        return ImageItCtrl;
      }(MetricsPanelCtrl));

      ImageItCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=imageit_ctrl.js.map
