{{- define "lab.labels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Values.image.tag | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version }}
{{- end -}}

{{- define "lab.selector" -}}
app.kubernetes.io/instance: {{ .root.Release.Name }}
app.kubernetes.io/component: {{ .component }}
{{- end -}}

{{/* Image for a component: [<registry>/]<prefix>-<component>:<tag> */}}
{{- define "lab.image" -}}
{{- $name := printf "%s-%s:%s" .root.Values.image.prefix .component .root.Values.image.tag -}}
{{- if .root.Values.image.registry -}}
{{ printf "%s/%s" .root.Values.image.registry $name }}
{{- else -}}
{{ $name }}
{{- end -}}
{{- end -}}
